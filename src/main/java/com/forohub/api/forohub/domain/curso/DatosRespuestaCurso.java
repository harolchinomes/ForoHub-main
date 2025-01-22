package com.forohub.api.forohub.domain.curso;

import java.util.UUID;

public record DatosRespuestaCurso(
        UUID id,
        String nombre,
        String categoria
) {
}
