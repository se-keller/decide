remove() {
	if test -e "$1"
		then
			rm "$1"
	fi
}

checkIfCreated() {
	if test -e "$1"
	then
		echo DONE $1 concatinated
	else
		echo FAIL coould not create $1
fi
}

file="../index.html"
remove $file
cat head.part.html navigation.part.html index.part.html bottom-script.part.html > $file
checkIfCreated $file


file="../create-consent.html"
remove $file
cat head.part.html navigation.part.html create/create-consent.part.html bottom-script.part.html > $file
checkIfCreated $file

