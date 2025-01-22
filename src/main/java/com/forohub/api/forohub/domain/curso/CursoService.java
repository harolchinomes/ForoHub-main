package com.forohub.api.forohub.domain.curso;

import com.forohub.api.forohub.domain.ValidacionException;
import com.forohub.api.forohub.domain.topico.DatosListadoTopico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    @Transactional
    public Curso crearCurso(DatosRegistrarCurso datosRegistrarCurso){
        Curso curso = new Curso(datosRegistrarCurso);
        return cursoRepository.save(curso);
    }

    public Page<DatosListadoCurso> listarCursos(Pageable paginacion) {
        return cursoRepository.findAll(paginacion).map(DatosListadoCurso::new);
    }

    public DatosListadoCurso obtenerCurso(String id){
        Curso curso = cursoRepository.findById(UUID.fromString(id)).orElseThrow(() -> new ValidacionException("Curso no encontrado"));
        return new DatosListadoCurso(curso);
    }

    @Transactional
    public Curso actualizarCurso(DatosActualizarCurso datosActualizarCurso){
        Curso curso = cursoRepository.findById(datosActualizarCurso.id())
                .orElseThrow(() -> new ValidacionException("Curso no encontrado"));

        if(cursoRepository.findByNombre(datosActualizarCurso.nombre()) != null){
            throw new ValidacionException("El curso ya existe");
        }

        if (datosActualizarCurso.nombre() != null) {
            curso.setNombre(datosActualizarCurso.nombre());
        }
        if (datosActualizarCurso.categoria() != null) {
            curso.setCategoria(datosActualizarCurso.categoria());
        }
        return cursoRepository.save(curso);
    }

    @Transactional
    public void eliminarCurso(UUID id){
        if(!cursoRepository.existsById(id)){
            throw new ValidacionException("Curso no encontrado");
        }else{
            cursoRepository.deleteById(id);
        }
    }
}
