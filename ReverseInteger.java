class Solution {
    public int reverse(int x) {
        int copy = x;
        int reverse = 0;
       while(copy != 0) {
           reverse = (reverse * 10) + (copy % 10);
           copy = copy / 10; 
       }
        if (copy >= Integer.MAX_VALUE) {
			return 0;
		} else {
          return reverse;   
        }
        }
        
    }
