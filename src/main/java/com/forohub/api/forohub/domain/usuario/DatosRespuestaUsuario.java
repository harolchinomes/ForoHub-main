package com.forohub.api.forohub.domain.usuario;

import java.util.UUID;

public record DatosRespuestaUsuario(
        UUID id,
        String nombre,
        String correo,
        String contrasena
) {
}
