package com.forohub.api.forohub.domain.topico;

import java.time.LocalDateTime;
import java.util.UUID;

public record DatosRespuestaTopico(
        UUID id,
        String titulo,
        String mensaje,
        LocalDateTime fechaCreacion,
        String autor,
        UUID curso,
        UUID usuarioId
) {
}
