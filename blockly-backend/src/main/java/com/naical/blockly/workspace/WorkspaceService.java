package com.naical.blockly.workspace;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkspaceService {
    List<Workspace> workspaces = new ArrayList<>();

    public void addWorkspace(Workspace workspace){
        workspace.setId((long) workspaces.size());
        workspaces.add(workspace);
    }

    public List<Workspace> getAllWorkspaces(){
        return workspaces;
    }

}
