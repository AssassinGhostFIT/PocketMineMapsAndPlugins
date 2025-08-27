package com.assassinghostfit.pocketminemapsandplugins;

import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btnInicio = findViewById(R.id.btnInicio);
        Button btnServers = findViewById(R.id.btnServers);
        Button btnSells = findViewById(R.id.btnSells);
        Button btnChat = findViewById(R.id.btnChat);
        Button btnPerfil = findViewById(R.id.btnPerfil);

        btnInicio.setOnClickListener(v ->
                Toast.makeText(this, "Inicio seleccionado", Toast.LENGTH_SHORT).show());

        btnServers.setOnClickListener(v ->
                Toast.makeText(this, "Servers seleccionado", Toast.LENGTH_SHORT).show());

        btnSells.setOnClickListener(v ->
                Toast.makeText(this, "Sells seleccionado", Toast.LENGTH_SHORT).show());

        btnChat.setOnClickListener(v ->
                Toast.makeText(this, "Chat seleccionado", Toast.LENGTH_SHORT).show());

        btnPerfil.setOnClickListener(v ->
                Toast.makeText(this, "Perfil seleccionado", Toast.LENGTH_SHORT).show());
    }
}
