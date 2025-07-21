package com.gusgaiotti.brickfactory.dto;

import com.gusgaiotti.brickfactory.entity.Brick;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;


public class CreateBrickRequest {
    @NotNull(message = "Cor não pode ser nula")
    private Brick.Color color;

    @NotNull(message = "Número de furos não pode ser nulo")
    @Pattern(regexp = "[1-8]", message = "Número de furos deve ser entre 1 e 8")
    private String holes;

    public CreateBrickRequest() {}

    public CreateBrickRequest(Brick.Color color, String holes) {
        this.color = color;
        this.holes = holes;
    }

    public Brick.Color getColor() { return color; }
    public void setColor(Brick.Color color) { this.color = color; }

    public String getHoles() { return holes; }
    public void setHoles(String holes) { this.holes = holes; }
}
