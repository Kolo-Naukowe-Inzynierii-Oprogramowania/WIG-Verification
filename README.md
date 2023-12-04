# Weryfikacja studentów WIG

## Założenia

1. Weryfikacja studentów WIG odbywa się na podstawie e-maila uczelnianego.
2. Student może mieć tylko jeden e-mail uczelniany.
3. Dowolna forma e-maila uczelnianego jest dowolna, ale musi zawierać on domenę uczelni.
4. Weryfikacja studenta odbywa się poprzez wysłanie wiadomości e-mail na adres uczelniany.
5. Użytkownik może mieć tylko jeden aktywny kod weryfikacyjny.
6. Kod weryfikacyjny jest ważny bezterminowo.
7. Kod weryfikacyjny jest generowany losowo.
8. Kod weryfikacyjny jest wysyłany na adres e-mail studenta.
9. Nie można wysłać kodu weryfikacyjnego na adres, który już został użyty.
10. Weryfikacja studenta odbywa się poprzez wpisanie kodu weryfikacyjnego na Discordzie.
11. Weryfikacja studenta ważna jest bezterminowo.
12. Weryfikacja studenta jest jednorazowa.
13. Weryfikacja studenta jest nieodwracalna.
14. Weryfikacja studenta jest anonimowa.
15. Weryfikacja studenta jest obowiązkowa w celu uzyskania dostępu do serwera WIG.

## Zalecenia (odnośnie bezpieczeństwa)

1. Port 3000 jest wolny.
2. Port 3000 jest **niedostępny z zewnątrz**.
3. Projekt serwera HTTP jest hostowany na tym samym serwerze co serwer WIG, na porcie 3000.
4. Serwer SMTP jest hostowany na tym samym serwerze co serwer WIG oraz serwer HTTP.