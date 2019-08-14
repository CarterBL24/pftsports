/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package carter_p3;

/**
 *
 * @author blcarter
 */
public class Dog {
    
    private String name;
    private int age;
    
    public Dog(String n, int a) {
        name = n;
        age = a;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String nombre) {
        name = nombre;
    }

    /**
     * @return the age
     */
    public int getAge() {
        return age;
    }

    /**
     * @param age the age to set
     */
    public void setAge(int ano) {
        age = ano;
    }
    //returns the age in person years
    public int personAge(int num) {
        num = this.age*7;
        return num;
    }
    
    //sends info back to main method
    public String toString() {
        return this.name + "," + personAge(age);
    }
}
