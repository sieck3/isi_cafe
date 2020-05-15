package com.example.versionandroid;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

public class ValidationCommandeActivity extends AppCompatActivity {

    Spinner jourRamassage, heureRamassage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_validation_commande);

        jourRamassage = findViewById(R.id.jourRamassage);
        heureRamassage = findViewById(R.id.heureRamassage);

        String[] jours = {"Aujourd'hui", "Demain"};
        String[] heures = {"09:00", "10:00", "10:30", "11:00", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:00", "15:30", "16:00", "16:30", "17:00"};

        ArrayAdapter<String> adapter1 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, jours);
        ArrayAdapter<String> adapter2 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, heures);

        jourRamassage.setAdapter(adapter1);
        heureRamassage.setAdapter(adapter2);

    }
}
