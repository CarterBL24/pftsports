/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.util.*;
/**
 *
 * @author blcarter
 */
public class Carter_P4 {

   /**
    * @param args the command line arguments
    */
   public static void main(String[] args) {
      // TODO code application logic here
      System.out.print("Enter a number between 1 and 100: ");
      Scanner input = new Scanner(System.in);
      int num;
      num = input.nextInt();
      Random rand = new Random();
      int rn = rand.nextInt(1) + 99;
      boolean run = true;
      int count = -1;
      String re = " ";
      
      while(run) {
         
         if(num == rn) {
            System.out.print("That is correct. Would you like to play again? (y/n): ");
            re = input.nextLine();
            switch(re) {
               case "y":
                  main(args);
                  break;
               case "n":
                  run = false;
                  break;
            }
         }
            
         else if(num < rn) {
            System.out.print("That is too low. Would you like to play again? (y/n): ");   
            re = input.nextLine();
            switch(re) {
               case "y":
                  main(args);
                  break;
               case "n":
                  run = false;
                  break;
            }
         }
            
         else {
            System.out.print("That is too high. Would you like to play again? (y/n): ");   
            re = input.nextLine();
            switch(re) {
               case "y":
                  main(args);
                  break;
               case "n":
                  run = false;
                  break;
            }
         }
         ++count;
         if(run == false) {
            break;
         }
      }
      System.out.println("You guessed "+count+" times.");
   } 
}
