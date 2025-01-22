package com.forohub.api.forohub.domain.usuario;

import java.util.UUID;

public record DatosListadoUsuario(
        UUID id,
        String nombre,
        String correo
) {
    public DatosListadoUsuario(Usuario usuario) {
        this(usuario.getId(),usuario.getNombre(), usuario.getCorreo());
    }
}
