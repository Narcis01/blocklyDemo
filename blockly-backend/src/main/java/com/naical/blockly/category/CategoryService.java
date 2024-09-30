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

        Error error_coffee11 = Error.builder().id(1L).description("NO_WATER").build();
        Error error_coffee21 = Error.builder().id(2L).description("NO_SUGAR").build();
        Error error_coffee31 = Error.builder().id(3L).description("NO_CUP").build();
        Error error_coffee41 = Error.builder().id(4L).description("NO_FILTER").build();

        List<Error> errors_coffee1 = new ArrayList<>(Arrays.asList(error_coffee11, error_coffee21, error_coffee31, error_coffee41));

        Error error_coffee12 = Error.builder().id(5L).description("NO_WATER").build();
        Error error_coffee22 = Error.builder().id(6L).description("NO_SUGAR").build();
        Error error_coffee32 = Error.builder().id(7L).description("NO_CUP").build();
        Error error_coffee42 = Error.builder().id(8L).description("NO_FILTER").build();

        List<Error> errors_coffee2 = new ArrayList<>(Arrays.asList(error_coffee12, error_coffee22, error_coffee32, error_coffee42));

        Error error_coffee13 = Error.builder().id(9L).description("NO_WATER").build();
        Error error_coffee23 = Error.builder().id(10L).description("NO_SUGAR").build();
        Error error_coffee33 = Error.builder().id(11L).description("NO_CUP").build();
        Error error_coffee43 = Error.builder().id(12L).description("NO_FILTER").build();

        List<Error> errors_coffee3 = new ArrayList<>(Arrays.asList(error_coffee13, error_coffee23, error_coffee33, error_coffee43));

        Machine machine1 = Machine.builder().id(1L).name("Miele Coffee Machine V1").errors(errors_coffee1).build();
        Machine machine2 = Machine.builder().id(2L).name("Miele Coffee Machine V2").errors(errors_coffee2).build();
        Machine machine3 = Machine.builder().id(3L).name("Miele Coffee Machine V3").errors(errors_coffee3).build();

        List<Machine> machines_coffee = new ArrayList<>(Arrays.asList(machine1, machine2, machine3));

        Category coffee = Category.builder().id(1L).name("Coffee_machines").machine(machines_coffee).build();


        Error error_washing1 = Error.builder().id(13L).description("NO_WATER").build();
        Error error_washing2 = Error.builder().id(14L).description("NO_WATER").build();
        Error error_washing3 = Error.builder().id(15L).description("NO_WATER").build();



        List<Error> errors_washing1 = new ArrayList<>(Arrays.asList(error_washing1));
        List<Error> errors_washing2 = new ArrayList<>(Arrays.asList(error_washing2));
        List<Error> errors_washing3 = new ArrayList<>(Arrays.asList(error_washing3));

        Machine machine_washing1 = Machine.builder().id(4L).name("Miele Washing Machine V1").errors(errors_washing1).build();
        Machine machine_washing2 = Machine.builder().id(5L).name("Miele Washing Machine V2").errors(errors_washing2).build();
        Machine machine_washing3 = Machine.builder().id(6L).name("Miele Washing Machine V3").errors(errors_washing3).build();

        List<Machine> machines_washing = new ArrayList<>(Arrays.asList(machine_washing1, machine_washing2, machine_washing3));

        Category washing = Category.builder().id(2L).name("Washing_machines").machine(machines_washing).build();

        categoryList.add(coffee);
        categoryList.add(washing);

        return categoryList;
    }
}
