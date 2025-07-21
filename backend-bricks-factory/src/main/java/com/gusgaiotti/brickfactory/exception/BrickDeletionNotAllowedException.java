package com.gusgaiotti.brickfactory.exception;

public class BrickDeletionNotAllowedException extends RuntimeException {
    public BrickDeletionNotAllowedException() {
        super("Este tijolo não pode ser deletado, pois não é defeituoso.");
    }
}