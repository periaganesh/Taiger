import java.util.*;
import java.util.stream.Collectors;

public class DefenderArcade {
  private List<List<Integer>> slotsAlloted = new ArrayList<>();

  public int countArcades(List<String> times) {
        List<List<Integer>> intTimeSlots=
                times.stream()
                .map(time -> {
                    String[] startEnd = time.split(" ");
                    return Arrays.asList(Integer.valueOf(startEnd[0]),Integer.valueOf(startEnd[1]));
                }).collect(Collectors.toList());
        intTimeSlots.stream()
                .sorted(new SlotComparator())
                .forEach(slotTime -> {
                    allotSlot(slotTime);
                });
        return slotsAlloted.size();
    }

    private void allotSlot(List<Integer> slotTime){
        int slotIndex = getFreeSlot(slotTime);
        if(slotIndex == -1)
            addNewSlot(slotTime);
        else
            useExistingSlot(slotTime,slotIndex);
    }

    private int getFreeSlot(List<Integer> slotTime){
        int index = 0;
        for(List<Integer> eachSlotAlloted : slotsAlloted){
            int comparision = eachSlotAlloted.get(1).compareTo(slotTime.get(0));
            if(comparision<=0){
                return index;
            }
            index++;
        }
        return -1;
    }

    private void addNewSlot(List<Integer> slotTime){
        slotsAlloted.add(slotTime);
    }

    private void useExistingSlot(List<Integer> slotTime, int slotIndex){
        slotsAlloted.set(slotIndex,slotTime);
    }

    private class SlotComparator implements Comparator<List<Integer>>{

        @Override
        public int compare(List<Integer> slot1, List<Integer> slot2) {
            return slot1.get(0).compareTo(slot2.get(0));
        }
    }
}
