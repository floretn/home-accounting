package ru.floretn.ha.beans;

public class HARuntimeException extends RuntimeException {
    public HARuntimeException() {
    }

    public HARuntimeException(String message) {
        super(message);
    }

    public HARuntimeException(String message, Throwable cause) {
        super(message, cause);
    }
}
