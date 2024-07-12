package com.naical.blockly.workspace;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Workspace {
    private Long id;
    private String content;
    private String title;
}
