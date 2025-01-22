package com.forohub.api.forohub.domain.topico;

import com.forohub.api.forohub.domain.usuario.Usuario;

import java.time.LocalDateTime;
import java.util.UUID;

public record DatosRegistrarTopico(
        String titulo,
        String mensaje,
        LocalDateTime fechaCreacion,
        String autor,
        UUID cursoId
) {

}
