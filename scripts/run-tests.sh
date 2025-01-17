#!/bin/bash

sleepTime=5

function wait-for-healthy() {
	printf 'wait-for-healthy: waiting for %s to return 200 OK\n' "$1"
	tries=0
	until curl -sL -w '%{http_code}\n' "$1" -o /dev/null | grep -q 200; do
		tries=${tries}+1
		if [[ ${tries} -gt 300 ]]; then
			printf "wait-for-healthy: Took longer than 1 minute to be healthy.\n"
			printf "wait-for-healthy: Waiting stopped.\n"
			return 1
		fi
		sleep 0.2
	done
	printf "wait-for-healthy: done.\n"
}

function errorCheck {
	EXIT_CODE=$1
	ERROR_MESSAGE=$2

	if [[ EXIT_CODE -ne 0 ]]; then
		echo "${ERROR_MESSAGE}"
		stopCluster
		exit "${EXIT_CODE}"
	fi
	return 0
}

function stopCluster {
	echo "shutting down dgraph alpha and zero..."
	kill -9 $(pgrep -f "dgraph zero") >/dev/null  # kill dgraph zero
	kill -9 $(pgrep -f "dgraph alpha") >/dev/null # kill dgraph alpha

	if pgrep -x dgraph >/dev/null; then
		echo "sleeping for 5 seconds so dgraph can shutdown"
		sleep 5
	fi

	echo "cluster teardown complete"
	return 0
}

function startAlpha {
	echo -e "starting dgraph alpha..."
	head -c 1024 /dev/random >"${SRCDIR}"/dgraph-local-data/acl-secret.txt
	dgraph alpha -p "${SRCDIR}"/dgraph-local-data/p \
		-w "${SRCDIR}"/dgraph-local-data/w \
		--bindall \
		--my localhost:7080 \
		--acl "access-ttl=1h; refresh-ttl=1d; secret-file=${SRCDIR}/dgraph-local-data/acl-secret.txt" \
		>"${SRCDIR}"/dgraph-local-data/alpha.log 2>&1 &

	# wait for alpha to be healthy
	ALPHA_HTTP_ADDR="localhost:8080"
	wait-for-healthy "${ALPHA_HTTP_ADDR}"/health
	errorCheck $? "dgraph alpha could not come up"
	sleep "${sleepTime}"
	return 0
}

function startZero {
	echo -e "starting dgraph zero..."
	dgraph zero --my localhost:5080 --bindall \
		-w "${SRCDIR}"/dgraph-local-data/wz >"${SRCDIR}"/dgraph-local-data/zero.log 2>&1 &

	# wait for zero to be healthy
	ZERO_HTTP_ADDR="localhost:6080"
	wait-for-healthy "${ZERO_HTTP_ADDR}"/health
	errorCheck $? "dgraph zero could not come up"
	sleep "${sleepTime}"
}

function init {
	echo -e "initializing..."
	rm -rf "${SRCDIR}"/dgraph-local-data
	mkdir "${SRCDIR}"/dgraph-local-data
}

# find parent directory of test script
readonly _SRCDIR
_SRCDIR=$(readlink -f "${BASH_SOURCE[0]%/*}")
SRCDIR=$(dirname "${_SRCDIR}")

init
startZero
startAlpha
sleep 10 # need time to create Groot user

npm run build

npm test
errorCheck $? "dgraph-js-http client tests FAILED"

stopCluster
rm -rf "${SRCDIR}"/local-dgraph-data
exit 0
