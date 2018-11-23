class Solution {
    public int lengthOfLastWord(String s) {
        if(s.length() == 0 || s == null) {
            return 0;
        }
        int count = 0;
        boolean word = false;
        for(int i = s.length() - 1; i >= 0; i--) {
            if(s.charAt(i) == ' ' && word) {
                return count;
            } 
            if(s.charAt(i) != ' '){
                count++;
                word = true;
            }
        }
       return count;
    }
}
