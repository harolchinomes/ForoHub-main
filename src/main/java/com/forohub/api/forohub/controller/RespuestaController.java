package com.forohub.api.forohub.controller;

import com.forohub.api.forohub.domain.respuesta.*;
import com.forohub.api.forohub.domain.topico.DatosActualizarTopico;
import com.forohub.api.forohub.domain.usuario.Usuario;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/respuestas")
public class RespuestaController {

    @Autowired
    private RespuestaService respuestaService;

    @GetMapping("/{id}")
    public ResponseEntity<DatosListadoRespuesta> obtenerRespuesta(@PathVariable String id){
        DatosListadoRespuesta datosRespuesta = respuestaService.obtenerRespuesta(id);
        return ResponseEntity.ok(datosRespuesta);
    }
    @GetMapping("/topico/{id}")
    public ResponseEntity<Page<DatosListadoRespuesta>> obtenerRespuestaPorTopico(@PageableDefault(size = 5) Pageable paginacion, @PathVariable UUID id){
        Page<DatosListadoRespuesta> datosRespuesta = respuestaService.obtenerRespuestaPorTopico(paginacion,id );
        return ResponseEntity.ok(datosRespuesta);
    }

    @PostMapping
    public ResponseEntity<DatosRespuestaRespuesta> registrarRespuesta(@RequestBody @Valid DatosRegistrarRespuesta datosRegistrarRespuesta, HttpServletRequest request) {
        Usuario usuario = (Usuario) request.getAttribute("usuario");
        Respuesta respuesta = respuestaService.crearRespuesta(datosRegistrarRespuesta, usuario.getId());
        DatosRespuestaRespuesta datosRespuestaRespuesta = new DatosRespuestaRespuesta(respuesta.getId(),respuesta.getMensaje(),
                respuesta.getTopicoId(),respuesta.getFechaCreacion(),respuesta.getAutorId(),respuesta.getSolucion());
        return ResponseEntity.ok(datosRespuestaRespuesta);
    }

    @PutMapping
    @Transactional
    public ResponseEntity actualizarRespuesta(@RequestBody @Valid DatosActualizarRespuesta datosActualizarRespuesta){
        Respuesta respuesta = respuestaService.actualizarRespuesta(datosActualizarRespuesta);
        DatosRespuestaRespuesta datosRespuestaRespuesta = new DatosRespuestaRespuesta(respuesta.getId(),respuesta.getMensaje(),
                respuesta.getTopicoId(),respuesta.getFechaCreacion(),respuesta.getAutorId(),respuesta.getSolucion());
        return ResponseEntity.ok(datosRespuestaRespuesta);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity eliminarRespuesta(@PathVariable UUID id){
        respuestaService.eliminarRespuesta(id);
        return ResponseEntity.ok().build();
    }
}
