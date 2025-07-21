package com.gusgaiotti.brickfactory.dto;

import com.gusgaiotti.brickfactory.entity.Brick;

public class BrickFilterRequest {
    private Brick.Color color;
    private Brick.Status status;
    private Boolean defective;

    public BrickFilterRequest() {}

    public Brick.Color getColor() { return color; }
    public void setColor(Brick.Color color) { this.color = color; }

    public Brick.Status getStatus() { return status; }
    public void setStatus(Brick.Status status) { this.status = status; }

    public Boolean getDefective() { return defective; }
    public void setDefective(Boolean defective) { this.defective = defective; }
}