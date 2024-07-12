package com.naical.blockly.workspace;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workspace")
@RequiredArgsConstructor
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    @PostMapping
    public ResponseEntity<Workspace> addWorkspace(@RequestBody Workspace workspace){
        workspaceService.addWorkspace(workspace);

        return ResponseEntity.ok(workspace);
    }

    @GetMapping
    public List<Workspace> getAllWorkspaces(){
        return workspaceService.getAllWorkspaces();
    }

}
