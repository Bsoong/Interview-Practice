//Given an array of integers, return indices of the two numbers such that they add up to a specific target.
class Solution {
    public int[] twoSum(int[] nums, int target) {
        for(int i = 0; i < nums.length; i++) {
            for(int j = i + 1; j < nums.length; j++) {
                if(nums[j] == target - nums[i]) {
                    return new int[] {i, j};
                }       
            }
        }
        throw new IllegalArgumentException ("No sum found");
    } 
}
