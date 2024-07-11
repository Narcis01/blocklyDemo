package com.naical.blockly.category;


import com.naical.blockly.error.Error;
import com.naical.blockly.machine.Machine;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryService {
    public List<Category> getAllCategories(){
        return generateCategories();
    }

    public List<Category> generateCategories(){
        List<Category> categoryList = new ArrayList<>();

        Error error_coffee1 = Error.builder().id(1L).description("NO_WATER").build();
        Error error_coffee2 = Error.builder().id(2L).description("NO_SUGAR").build();
        Error error_coffee3 = Error.builder().id(3L).description("NO_CUP").build();
        Error error_coffee4 = Error.builder().id(4L).description("NO_FILTER").build();

        List<Error> errors_coffee = new ArrayList<>(Arrays.asList(error_coffee1, error_coffee2, error_coffee3, error_coffee4));

        Machine machine1 = Machine.builder().id(1L).name("Miele Coffee Machine V1").errors(errors_coffee).build();
        Machine machine2 = Machine.builder().id(2L).name("Miele Coffee Machine V2").errors(errors_coffee).build();
        Machine machine3 = Machine.builder().id(3L).name("Miele Coffee Machine V3").errors(errors_coffee).build();

        List<Machine> machines_coffee = new ArrayList<>(Arrays.asList(machine1, machine2, machine3));

        Category coffee = Category.builder().id(1L).name("Coffee_machines").machine(machines_coffee).build();


        Error error_washing1 = Error.builder().id(4L).description("NO_WATER").build();


        List<Error> errors_washing = new ArrayList<>(Arrays.asList(error_washing1));

        Machine machine_washing1 = Machine.builder().id(1L).name("Miele Washing Machine V1").errors(errors_washing).build();
        Machine machine_washing2 = Machine.builder().id(2L).name("Miele Washing Machine V2").errors(errors_washing).build();
        Machine machine_washing3 = Machine.builder().id(3L).name("Miele Washing Machine V3").errors(errors_washing).build();

        List<Machine> machines_washing = new ArrayList<>(Arrays.asList(machine_washing1, machine_washing2, machine_washing3));

        Category washing = Category.builder().id(2L).name("Washing_machines").machine(machines_washing).build();

        categoryList.add(coffee);
        categoryList.add(washing);

        return categoryList;
    }
}
