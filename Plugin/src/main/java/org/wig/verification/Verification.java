package org.wig.verification;

import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.format.TextColor;
import org.bukkit.Bukkit;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.plugin.java.JavaPlugin;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.awt.*;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.temporal.ChronoUnit;

public final class Verification extends JavaPlugin implements Listener {
    private static final HttpClient client = HttpClient.newHttpClient();
    @Override
    public void onEnable() {
        Bukkit.getPluginManager().registerEvents(this, this);
    }
    @Override
    public void onDisable() {

    }

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("http://127.0.0.1:3000/verify_user"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString("{\"username\":\"" + event.getPlayer().getName() + "\"}"))
                .timeout(Duration.of(30, ChronoUnit.SECONDS))
                .build();
        try {
            HttpResponse<String> httpResponse = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            JSONParser parser = new JSONParser();
            JSONObject jsonObject;
            try {
                jsonObject = (JSONObject) parser.parse(httpResponse.body());
                boolean verified = (Boolean) jsonObject.get("verified");
                if(verified) {
                    event.getPlayer().sendMessage("Witaj na serwerze WIG!");
                } else {
                    Component kickMessage = Component.text("Nie jesteś zweryfikowany.").color(TextColor.color(0xFFFFFF));
                    event.getPlayer().kick(kickMessage);
                }
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        } catch(IOException | InterruptedException e) {
            Bukkit.getLogger().info(e.getMessage());
        }
    }
}