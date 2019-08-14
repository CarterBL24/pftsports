// Written By: Jordan Wesley
// Programming Assignment 5 for CSDP 398
// Date: 11/03/2017
// Compiler: jGRASP 2.0.1
// Purpose: Edit classes and add new methods to calculate the average of three tests
//********************************************************************
//  Wesley_P5.java       Author: Lewis/Loftus
//
//  Demonstrates the use of an aggregate class.
//********************************************************************

public class Wesley_P5 
{
   //-----------------------------------------------------------------
   //  Creates some Address and Student objects and prints them.
   //-----------------------------------------------------------------
   public static void main(String[] args)
   {
      Address school = new Address("800 Lancaster Ave.", "Villanova",
                                   "PA", 19085);
      Address jHome = new Address("21 Jump Street", "Blacksburg",
                                  "VA", 24551);
      Student john = new Student("John", "Smith", jHome, school);
      
      john.setTestScore(1,65);
      john.setTestScore(2,90);
      john.setTestScore(3,100);
      john.average();

      Address mHome = new Address("123 Main Street", "Euclid", "OH",
                                  44132);
      Student marsha = new Student("Marsha", "Jones", mHome, school);
      
      marsha.setTestScore(1,88);
      marsha.setTestScore(2,70);
      marsha.setTestScore(3,90);
      marsha.average();

      System.out.println(john);
      System.out.println();
      System.out.println(marsha);
   }
}