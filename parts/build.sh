echo

set -e

remove() {
	if test -e "$1"
		then
			rm "$1"
	fi
}

checkIfCreated() {
	if test -e "$1"
	then
		echo [DONE] $1 concatinated
	else
		echo [FAIL] coould not create $1
	fi
}

file="../index.html"
remove $file
cat head.part.html close-head.part.html navigation.part.html index.part.html close-body.part.html > $file
checkIfCreated $file


file="../consent-create.html"
remove $file
cat head.part.html consent/scripts.part.html close-head.part.html navigation.part.html consent/consent-create.part.html close-body.part.html > $file
checkIfCreated $file

echo 

