class Solution {
    public boolean isValid(String s) {
        if(s.length() == 0) {
            return false;
        }
        int count1 = 0;
        int count2 = 0;
        int count3 = 0;
        for(int i = 0; i < s.length(); i++) {
            if(s.charAt(i) == '(') {
              count1++;   
            }
            
            else if(s.charAt(i) == '{') {
              count2++;   
            }
            else if(s.charAt(i) == '[') {
              count3++;   
            }
            else if(s.charAt(i) == ')') {
              count1--;   
            }
            else if(s.charAt(i) == '}') {
              count2--;   
            }
            else if(s.charAt(i) == ']') {
              count3--;   
            }
            else {
                return false;
            }
        }
        System.out.println(count1);
        if(count1 == 0 && count2 == 0 && count3 == 0) {
            return true;
        } else {
            return false;
        }
    }
}
