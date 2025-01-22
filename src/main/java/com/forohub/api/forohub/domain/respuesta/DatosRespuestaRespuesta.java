package com.forohub.api.forohub.domain.respuesta;

import java.time.LocalDateTime;
import java.util.UUID;

public record DatosRespuestaRespuesta(
        UUID id,
        String mensaje,
        UUID topicoId,
        LocalDateTime fechaCreacion,
        UUID autorId,
        Boolean solucion
) {
}
