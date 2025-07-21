package com.gusgaiotti.brickfactory.dto;

import com.gusgaiotti.brickfactory.entity.Brick;
import jakarta.validation.constraints.NotNull;


public class BrickDTO {
    private Long id;

    @NotNull(message = "Cor não pode ser nula")
    private Brick.Color color;

    private String holes;

    @NotNull(message = "Status não pode ser nulo")
    private Brick.Status status;

    private boolean defective;

    public BrickDTO() {}

    public BrickDTO(Long id, Brick.Color color, String holes, Brick.Status status, boolean defective) {
        this.id = id;
        this.color = color;
        this.holes = holes;
        this.status = status;
        this.defective = defective;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Brick.Color getColor() {
        return color;
    }

    public void setColor(Brick.Color color) {
        this.color = color;
    }

    public String getHoles() {
        return holes;
    }

    public void setHoles(String holes) {
        this.holes = holes;
    }

    public Brick.Status getStatus() {
        return status;
    }

    public void setStatus(Brick.Status status) {
        this.status = status;
    }

    public boolean isDefective() {
        return defective;
    }

    public void setDefective(boolean defective) {
        this.defective = defective;
    }

    @Override
    public String toString() {
        return "BrickDTO{" +
                "id=" + id +
                ", color=" + color +
                ", holes='" + holes + '\'' +
                ", status=" + status +
                ", defective=" + defective +
                '}';
    }
}