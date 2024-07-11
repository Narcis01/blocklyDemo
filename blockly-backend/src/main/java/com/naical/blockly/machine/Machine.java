package com.naical.blockly.machine;


import com.naical.blockly.error.Error;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class Machine {

    private Long id;
    private String name;

    private List<Error> errors;
}
