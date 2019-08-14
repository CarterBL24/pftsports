/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package carter_p3;
import java.util.*;
/**
 *
 * @author blcarter
 */
public class Carter_P3 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        
        //reads input
        Scanner input = new Scanner(System.in);
        String name;
        int age;
        
        //prompt statements and input clause
        System.out.print("Enter dog's name: ");
        name = input.nextLine();
        System.out.print("Enter dog's age: ");
        age = input.nextInt();
        
        //calls dog class in separate file
        Dog dog = new Dog(name,age);
        System.out.println("Dog's name and age: " + dog.toString());
    }
    
}
