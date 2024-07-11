package com.naical.blockly.category;

import com.naical.blockly.machine.Machine;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class Category {

    private Long id;
    private String name;

    private List<Machine> machine;
}
