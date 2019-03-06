import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Collections;

public class RoyalRumble {

    public List<String> getSortedList(List<String> names) {
        Collections.sort(names, new RoyalNameComparator());
        return names;
    }

    private class RoyalNameComparator implements Comparator<String> {

        public int compare(String royalName1, String royalName2) {
            String[] royal1 = royalName1.split(" ");
            String[] royal2 = royalName2.split(" ");
            int result = royal1[0].compareTo(royal2[0]);
            return result == 0 ? toInt(royal1[1]).compareTo(toInt(royal2[1])) : result;
        }

        private Integer toInt(String romanNum){
            int romanVal = 0;
            int lastRomanChar = -1;

            char[] romanChars = romanNum.toCharArray();
            for(char eachChar : romanChars){
                switch (eachChar){
                    case 'I':
                        lastRomanChar = 1;
                        romanVal += 1;
                        break;
                    case 'V':
                        romanVal += lastRomanChar==1 ? 3 : 5;
                        lastRomanChar = 5;
                        break;
                    case 'X':
                        romanVal += lastRomanChar==1 ? 8 : 10;
                        lastRomanChar = 10;
                        break;
                    case 'L':
                        romanVal += lastRomanChar==10 ? 30 : 50;
                        lastRomanChar = 50;
                        break;
                }
            }
            return romanVal;
        }
    }
}
