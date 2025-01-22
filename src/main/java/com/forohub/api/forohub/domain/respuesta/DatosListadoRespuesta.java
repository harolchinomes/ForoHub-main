package com.forohub.api.forohub.domain.respuesta;

import com.forohub.api.forohub.domain.topico.Topico;
import com.forohub.api.forohub.domain.usuario.Usuario;

import java.time.LocalDateTime;
import java.util.UUID;

public record DatosListadoRespuesta(
        UUID id,
        String mensaje,
        UUID topicoId,
        LocalDateTime fechaCreacion,
        UUID autorId,
        Boolean solucion,
        String autorNombre

) {
    public DatosListadoRespuesta(Respuesta respuesta,Usuario autor) {
        this(respuesta.getId(),respuesta.getMensaje(), respuesta.getTopicoId(), respuesta.getFechaCreacion(), respuesta.getAutorId(), respuesta.getSolucion(), autor.getNombre());
    }
}
