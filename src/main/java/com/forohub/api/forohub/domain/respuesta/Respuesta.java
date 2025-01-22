package com.forohub.api.forohub.domain.respuesta;

import com.forohub.api.forohub.domain.topico.Topico;
import com.forohub.api.forohub.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "respuestas")
@Entity(name = "Respuesta")
@Getter
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Respuesta {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String mensaje;

    @ManyToOne
    @JoinColumn(name="topico_id")
    private Topico topico;
    @Column(name="topico_id", insertable = false, updatable = false)
    private UUID topicoId;

    private LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name="autor_id")
    private Usuario autor;
    @Column(name="autor_id", insertable = false, updatable = false)
    private UUID autorId;

    private Boolean solucion;

    public Respuesta() {
    }

    public Respuesta(DatosRegistrarRespuesta datosRegistrarRespuesta, Topico topico, Usuario autor) {
        this.mensaje = datosRegistrarRespuesta.mensaje();
        this.topico = topico;
        this.topicoId = topico.getId();
        this.fechaCreacion = datosRegistrarRespuesta.fechaCreacion();
        this.autor = autor;
        this.autorId = autor.getId();
        this.solucion = datosRegistrarRespuesta.solucion();
    }

    public UUID getId() {
        return id;
    }

    public String getMensaje() {
        return mensaje;
    }

    public Topico getTopico() {
        return topico;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public UUID getAutorId() {
        return autorId;
    }

    public UUID getTopicoId() {
        return topicoId;
    }

    public Usuario getAutor() {
        return autor;
    }

    public Boolean getSolucion() {
        return solucion;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public void setSolucion(Boolean solucion) {
        this.solucion = solucion;
    }
}
