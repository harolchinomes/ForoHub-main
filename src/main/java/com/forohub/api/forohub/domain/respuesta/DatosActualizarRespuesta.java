package com.forohub.api.forohub.domain.respuesta;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record DatosActualizarRespuesta(
        @NotNull
        UUID id,
        String mensaje,
        Boolean solucion
) {
}
