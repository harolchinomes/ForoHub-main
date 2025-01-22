package com.forohub.api.forohub.domain.topico;

import com.forohub.api.forohub.domain.curso.Curso;
import com.forohub.api.forohub.domain.respuesta.Respuesta;
import com.forohub.api.forohub.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Table(name = "topicos")
@Entity(name = "Topico")
@Getter
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Topico {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(unique = true)
    private String titulo;

    private String mensaje;
    private LocalDateTime fechaCreacion;
    private String autor;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name="usuario_id", insertable = false, updatable = false)
    private UUID usuarioId;

    @OneToMany(mappedBy = "topico")
    private List<Respuesta> respuestas;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;

    @Column(name="curso_id", insertable = false, updatable = false)
    private UUID cursoId;

    public Topico() {
    }

    public Topico(DatosRegistrarTopico datosRegistrarTopico, Usuario usuario, Curso curso) {
        this.titulo = datosRegistrarTopico.titulo();
        this.mensaje = datosRegistrarTopico.mensaje();
        this.fechaCreacion = datosRegistrarTopico.fechaCreacion();
        this.autor = datosRegistrarTopico.autor();
        this.curso = curso;
        this.cursoId = curso.getId();
        this.usuario = usuario;
        this.usuarioId = usuario.getId();
    }

    public UUID getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getMensaje() {
        return mensaje;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public String getAutor() {
        return autor;
    }

    public Curso getCurso() {
        return curso;
    }

    public Usuario getUsuario() {
        return usuario;
    }


    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public void setCursoId(UUID cursoId) {
        this.cursoId = cursoId;
    }

    public UUID getUsuarioId() {
        return usuarioId;
    }

    public UUID getCursoId() {
        return cursoId;
    }

    public List<Respuesta> getRespuestas() {
        return respuestas;
    }
}
