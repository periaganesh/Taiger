#!/bin/bash

if [ "$2" != "APPLE PIE" ] && [ "$2" != "PINEAPPLE PIE" ] && [ "$2" != "FRUIT PARFAIT" ]
then
  echo "We do not have that on the menu"
  exit;
fi

inputFile=$1
appleCount=0
pineappleCount=0

if [ -f $inputFile ]
then
  while IFS= read line
    do
      lineInCaps=`echo $line | tr '[:upper:]' '[:lower:]'`
      lengthMinus1=$((${#lineInCaps}-1))
      lineInCaps=${lineInCaps:0:$lengthMinus1}
      case $lineInCaps in
        apple)
	  appleCount=$((appleCount+1))
	  ;;
	pineapple)
	  pineappleCount=$((pineappleCount+1))
	  ;;
      esac
    done < $inputFile
else
  echo "File doesn't exist" 1>&2
fi

case $2 in
  'APPLE PIE')
    if [ $appleCount -ge 3 ]
    then
      echo "You shall have $2!"
    else
      echo "You shall not have $2"
    fi
    ;;
  'PINEAPPLE PIE')
    if [ $pineappleCount -ge 3 ]
    then
      echo "You shall have $2!"
    else
      echo "You shall not have $2"
    fi
    ;;
  'FRUIT PARFAIT')
    if [ $appleCount -ge 2 -a $pineappleCount -ge 2 ]
    then
      echo "You shall have $2!"
    else
      echo "You shall not have $2"
    fi
    ;;
esac
