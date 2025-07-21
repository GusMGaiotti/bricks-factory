package com.gusgaiotti.brickfactory.dto;

import com.gusgaiotti.brickfactory.entity.Brick;
import jakarta.validation.constraints.NotNull;

public class UpdateStatusRequest {

    @NotNull(message = "Status não pode ser nulo")
    private Brick.Status status;

    public UpdateStatusRequest() {}

    public UpdateStatusRequest(Brick.Status status) {
        this.status = status;
    }

    public Brick.Status getStatus() {
        return status;
    }

    public void setStatus(Brick.Status status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "UpdateStatusRequest{" +
                "status=" + status +
                '}';
    }
}