package com.forohub.api.forohub.controller;

import com.forohub.api.forohub.domain.curso.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/cursos")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<DatosListadoCurso>>> listadoCurso(@PageableDefault(size = 2) Pageable paginacion, PagedResourcesAssembler<DatosListadoCurso> assembler){
        Page<DatosListadoCurso> page = cursoService.listarCursos(paginacion);
        return ResponseEntity.ok(assembler.toModel(page));
    }

    @PostMapping
    public ResponseEntity<DatosRespuestaCurso> registrarCurso(@RequestBody @Valid DatosRegistrarCurso datosRegistrarCurso) {
        Curso curso = cursoService.crearCurso(datosRegistrarCurso);
        DatosRespuestaCurso datosRespuestaCurso = new DatosRespuestaCurso(curso.getId(),curso.getNombre(),curso.getCategoria());
        return ResponseEntity.ok(datosRespuestaCurso);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatosListadoCurso> obtenerCurso(@PathVariable String id){
        DatosListadoCurso datosRespuestaCurso = cursoService.obtenerCurso(id);
        return ResponseEntity.ok(datosRespuestaCurso);
    }

    @PutMapping
    @Transactional
    public ResponseEntity actualizarCurso(@RequestBody @Valid DatosActualizarCurso datosActualizarCurso){
        Curso curso = cursoService.actualizarCurso(datosActualizarCurso);
        DatosRespuestaCurso datosRespuestaCurso = new DatosRespuestaCurso(curso.getId(),curso.getNombre(),curso.getCategoria());
        return ResponseEntity.ok(datosRespuestaCurso);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity eliminarCurso(@PathVariable UUID id){
        cursoService.eliminarCurso(id);
        return ResponseEntity.ok().build();
    }
}
