while sleep 5;
do
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
		echo [FAIL] could not create $1
	fi
}

file="../index.html"
remove $file
cat head.part.html scripts.part.html close-head.part.html navigation.part.html index.part.html close-body.part.html > $file
checkIfCreated $file


file="../consent-create.html"
remove $file
cat head.part.html consent-create/scripts.part.html close-head.part.html navigation.part.html consent-create/consent-create.part.html close-body.part.html > $file
checkIfCreated $file

file="../consent-participate.html"
remove $file
cat head.part.html consent-participate/scripts.part.html close-head.part.html navigation.part.html consent-participate/consent-participate.part.html close-body.part.html > $file
checkIfCreated $file

file="../share.html"
remove $file
cat head.part.html share/scripts.part.html close-head.part.html navigation.part.html share/share.part.html close-body.part.html > $file
checkIfCreated $file

file="../participate.html"
remove $file
cat head.part.html participate/scripts.part.html close-head.part.html navigation.part.html participate/participate.part.html close-body.part.html > $file
checkIfCreated $file

echo 
done

