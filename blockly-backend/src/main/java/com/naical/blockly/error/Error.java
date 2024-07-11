package com.naical.blockly.error;

import com.naical.blockly.machine.Machine;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder

public class Error {

    private Long id;
    private String description;

}
