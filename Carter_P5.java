// Written By: Brandon Carter
// Programming Assignment 5 for CSDP 398
// Date: 11/09/2017
// Compiler: jGRASP 2.0.1
// Purpose: ...

public class Carter_P5 {
   public static void main(String[] args) {
      Address school = new Address("800 Lancaster Ave.", "Villanova",
                                   "PA", 19085);
      Address jHome = new Address("21 Jump Street", "Blacksburg",
                                  "VA", 24551);
      Student john = new Student("John", "Smith", jHome, school);
      
      john.setTestScore(1,72);
      john.setTestScore(2,84);
      john.setTestScore(3,96);
      john.average();
   
      Address mHome = new Address("123 Main Street", "Euclid", "OH",
                                  44132);
      Student marsha = new Student("Marsha", "Jones", mHome, school);
      
      marsha.setTestScore(1,90);
      marsha.setTestScore(2,98);
      marsha.setTestScore(3,92);
      marsha.average();
   
      System.out.println(john);
      System.out.println();
      System.out.println(marsha);
   }
}