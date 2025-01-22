package com.forohub.api.forohub.domain.usuario;

import com.forohub.api.forohub.domain.perfil.Perfil;
import com.forohub.api.forohub.domain.respuesta.Respuesta;
import com.forohub.api.forohub.domain.topico.Topico;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Table(name = "usuarios")
@Entity(name = "Usuario")
@Getter
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String nombre;

    @Column(unique = true)
    private String correo;

    private String contrasena;

    @ManyToMany
    @JoinTable(
            name= "usuario_perfil",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "perfil_id")
    )
    private Set<Perfil> perfiles;

    @OneToMany(mappedBy = "usuario")
    private List<Topico> topicos;

    @OneToMany(mappedBy = "autor")
    private List<Respuesta> respuestas;

    // Constructor por defecto requerido por JPA
    public Usuario(){}

    public Usuario(DatosRegistrarUsuario datosRegistrarUsuario) {
        this.nombre = datosRegistrarUsuario.nombre();
        this.correo = datosRegistrarUsuario.correo();
        this.contrasena = datosRegistrarUsuario.contrasena();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    public String getNombre() {
        return nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public UUID getId(){
        return id;
    }

    public Set<Perfil> getPerfiles() {
        return perfiles;
    }

    public void setPerfiles(Set<Perfil> perfiles) {
        this.perfiles = perfiles;
    }

    @Override
    public String getPassword() {
        return contrasena;
    }

    @Override
    public String getUsername() {
        return correo;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setContrasena(String encryptedPassword) {
        this.contrasena = encryptedPassword;
    }
}
