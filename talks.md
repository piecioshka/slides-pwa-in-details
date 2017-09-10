# Inne tematy

> Lista prelekcji jakie mogą zostać poprowadzone na temat PWA

### Talk #1: PWA Overview

* Jaki jest największy problem z aplikacjami mobilnymi?
    - dystrybucja
* Co to jest <mark>Progressive Web Apps</mark>?
* Progressive Enhancement
    - możesz używać Service Worker-ów już teraz
    - przeglądarki które nie mają wsparcie będą działać "po staremu"
* Rejestracja Service Workera
    - oddzielny plik JavaScript, który będzie mógł cache-ować odpowiedzi,
        aby nie pobierać za każdym razem najnowszej wersji
* Znasz AppCache Manifest?
    - ten plain/text-owy plik po skeszowaniu pliku nie było możliwości jego
        usunięcia - trzeba było zmienić nazwę
    - bardzo prosty format
    - plik z rozszerzeniem *.appcache
    - przykład osadzenia:
        
        ```html
        <!DOCTYPE html>
        <html manifest="app.appcache">
          <!-- /-->
        </html>
        ``` 
* Extensible Web Manifesto
    - https://extensiblewebmanifesto.org/
    - dlaczego programiści przeglądarek mają być lepsi od programistów webowych?
    - web developerzy powinni dostać low-level API aby tworzyć aplikacje,
        które będą konkurować z aplikacjami natywnymi

* Sklepy
    - Windows Store opublikował w 2016 roku, że będzie wspierał aplikacje oparte
        na założeniach PWA

* Aplikacje progresywne?
    1. Do świata dokumentów HTML wkroczył JavaScript - 1994
    2. AJAX za pomocą obiektu XMLHttpRequest - 2002
    3. Node.js - 2009
    4. HTML5 (video, storage) - 2014
    5. ECMAScript 6 - 2015
    6. Tryb Offline? - 2016

* Dlaczego?
    1. User Experience
    2. Wydajność
    3. Integracja z urządzeniem
        - "instalacja" w systemie
            - nie trzeba ściągać aplikacji aby ją używać
        - prezentacja w urządzeniu jako typowa aplikacja - posada customową ikonę
        - uruchomienie w trybie fullscreen

* Największy plus aplikacji?
    - po wejściu do aplikacji drugi raz masz już najnowszą wersję
    - nie ma żadnego QA certyfikującego aplikację (plus oraz minus)
    - mogę pracować offline
    - są to normalne strony WWW
    - nie trzeba specjalnych developerów do utrzymywania
    - aplikacje są "wyszukiwalne" w Google
    - można zalinkować do konkretnej strony w aplikacji (deep linking w natywnych aplikacjach)

* Filary PWA

* HTTPS
    - Pojawia się przycisk `Add to Home Screen`
    - Push Notifications
        - zasada działania?
        - po co potrzebne?
            - consumer engaging, przykłady:
                - Beyond The Rack: 72%+ więcej czasu spędzają na stronie po uruchomieniu Push Notifications
        - kiedy działa?
            - nawet kiedy strona jest wyłączona!
            - nawet kiedy przeglądarka jest zamknięta!
            - TODO: to jak to działa?
        - Hint: uważać na wyłączenie powiadomień po podłączeniu Maca do komputera
* RWD (Accessibility)
    - konfiguracja `theme-color`
    - kontrast kolorów tekstu i tła
        - jak zbadać współczynnik?
        - polecam: https://leaverou.github.io/contrast-ratio/
    - dodanie atrybutu `async`
        - jeśli podczas ładowanie nie musi być zmieniony DOM, przed załadowaniem następnych plików

* Manifest
    - osobny plik `*.json`
    - w głównym katalogu projektu
    - osadzenie w pliku HTML
    - co dzięki niemu można skonfigurować?
        - opisy, kolory, ikony

* `Service Worker` (wsparcie Offline Mode)
    - 💡Powerful tool
    - Tryby a życie:
        - Wi-Fi - online
        - offline
        - Lie-Fi - baaardzo słaby internet
    - osobny plik `*.js
    - nie dorzucaj go obok reszty plików *.js
    - osadzenie w pliku HTML
    - współautor: Jake Archibald
    - Wsparcie w przeglądarkach: https://jakearchibald.github.io/isserviceworkerready/
    - Application Shell
        - always visible
        - better UI interaction
    - TODO: czy Service Workers zadziała na HTTP?
        - kiedy skrypt jest uruchomiony po HTTPSie nie ma możliwości zmiany
            zmiany odpowiedzi z serwera
        - 💡GitHub Pages wspierają protokół HTTPS
    - minusy - ograniczenia
        - nie jest powiązany z żadną stroną
        - nie ma dostępu do DOMa
        - niskopoziomowe API
        - uruchomiony jest w swoim globalnym kontekście
        - skrypt musi być na tym samym originie co strona, która go zainstalowała
        - Co to jest `origin`? Protokół, host (domena albo IP), port
    - plusy
        - może być uruchamiany bez jakiejkolwiek strony
        - kończy swoje działanie kiedy nie jest używany, rozpoczyna swoje
            działanie kiedy jest potrzebny - event driven
        - posiada możliwość upgrade-owania
        - działa tylko po HTTPSie
        - można wykorzystać tą technologię do:
            - Push Notifications
            - Background sync
            - Geofencing
                - 💡Ciekawostka: problem z URLem (geofencing-list-of-prs.png) 
    - zasada działania?
        - przejmuje kontrolę nad połączeniami na urządzeniu
        - jeden SW może obsługiwać kilka tabów
        - może zmieniać odpowiedź z serwera
        - Krok po kroku
            1. Download
            2. Install (event) - potrzebne do ustawienia storage-a
            3. Activate (event) - po uruchomieniu tego zdarzenia przejmujemy
                kontrolę nad: CSS, JS, images, XHR...
                Nie mamy kontroli nad innymi Service Workerami (pętla?)
        - TODO: life cycle of Service Worker - Do kiedy żyje Service Worker?
            - wykorzystać obrazek: https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
            - opis
                1. Jeśli wchodzisz na stronę to rejestruje się SW
                2. Wyłączasz kartę, albo przechodzisz na stronę gdzie nie ma wsparcie SW
                3. Wracasz na pierwotną stronę i rejestruje się nowy SW
        - Aby sprawdzić czy SW jest uruchomiony na stronie:
            `navigator.serviceWorker.controller`
        - TODO: Przykład: Podmiana obrazka w locie
            - respondWith
                - przyjmuje `Response` albo `Promise` (fetch?)
            - fetch: `mode: no-cors` :-D
                - and you can access to: https://piecioshka.pl/labs/long-request-for-image-service/?time=2
                - Nie jest dodawany nagłówek `origin` do requestu
            - CORS
                - ...to protokół
                - poinformowanie, że dany zasób może być współdzielony przez inne originy
                - wymagany jest nagłówek "origin" w requeście
                - bez nagłówka "origin" mechanizm CORS nie będzie włączony
        - `navigator.serviceWorker.register(scriptURL, options)` scheme
            - `options.scope` - domyślnym jest katalog w którym jest plik z definicją Service Workera
            - `options.type`
            - `options.updateViaCache`
        - Kiedy rzeczy znikają z Cache-a?
            - tylko kiedy je jawnie usuniemy
            - żadne nagłówki HTTP nie pomogą
        - TODO: Przykład: Zastosowanie Cache-a: https://w3c.github.io/ServiceWorker/#cache-query-options-dictionary
            - UWAGA: po stworzeniu kilku kontenerów z wersjami strony,
                zasób będzie zwracany z pierwszego kontenera z cache-em,
                który będzie posiadał dany zasób w kolejności tworzenia
                kontenerów z cache-em (`matchAll`)

* Porównanie strategii
    1. Network First
        
        * użytkownik zawsze pobiera dane z serwera
        * nowo pobrane dane są zapisywane do cache storage-a

    2. Cache First

        * użytkownik wchodzi na stronę i wszelkie pliki zapisywane, są w cache,
            aby następnym razem nie ściągać ich z serwera
        * po każdym deploy-u identyfikator kontenera jest zmieniany, po to, aby 
            użytkownicy pobrali najnowszą wersję plików

    3. Solution? Network First 80%, Cache First 20%)
    
    * W zależności od zasobu:
        - użytkownik pobiera dane z serwera jeśli są to zasoby zewnętrzne
        - użytkownik pobiera dane z cache-a jeśli są to zasoby lokalne

    * Q & A

        Co jeśli kod się zmienił bez deploy-u np. artykuł redaktorski w WordPress?

        - w strategi 1. użytkownik dostanie najnowszą wersję
        - w strategi 2. użytkownik dostanie najnowszą wersję zasobów, tym samym 
        nie ma znaczenie w jaki sposób (i czego) zmiany weszły w życie na stronie
        - w strategi 3. użytkownik nie będzie miał dostępu do wprowadzonych poprawek

---

### Talk #2: Moje doświadczenie z PWA

1. Przerobienie strony piecioshka.pl/blog
    - wykorzystanie strategii "Network-first"
2. Przerobienie strony piecioshka.pl/
    - wykorzystanie strategii "Cache-first"
3. Wyłączenie Service Workera z piecioshka.pl/blog
    - ze względu na niepoprawną konfigurację pojawił się błąd,
        że czytelnicy nigdy nie zobaczyliby najnowszej strony
4. Szczegółowa analiza Service Worker-ów na potrzeby tej prelekcji
    - ETA 4 miesiące
5. Włączenie Service Workera na piecioshka.pl/blog/
    - wykorzystanie strategii "Network-first"
        - cache-owanie wszystkiego na co użytkownik wejdzie
        - aktualizacja nazwy Cache-kontenera podczas release-u aplikacji
            (czytelnicy wchodząc na stronę pobiorą sobie nowego Service Workera,
            pobierając tym samym kolejny raz artykuł)

---

### Talk #3: Bezpieczeństwo aplikacji PWA

1. HTTPS
    - Dlaczego uznajemy ten protokół za bezpieczny?
    - Jak działa HTTPS?
        - wymiana kluczy, kto wymienia z kim?
        - kto szyfruje czym
    - Jak zdobyć certyfikat?
        - polecam: CloudFlare
3. Atak #1: Wyjaśnienie ataku `man-in-the-middle`
    - narysować jak w pracy wykorzystujemy ten atak do sniffowania urządzeń
2. Atak #2: Request Hijacking
    - Podmiana obrazka
    - Bonus: Czy można złamać zabezpieczenia i przechwycić ruch po HTTP za pomocą 
        Service Workera?

---

### Talk #4: Debugging aplikacjiPWA

- chrome://inspect/#service-workers
- chrome://serviceworker-internals
* Hint: Przełączanie kontekstu uruchamiania kodu
    
    W DevToolsach istnieje możliwość uruchamiania kodu na rzecz każdego 
    okienka / środowiska, które jest dostępne na otworzonej stronie 
    internetowej. I tak jeśli wyświetlamy `<iframe>` albo korzystamy z 
    Service Workera możesz wskazać w zakładce Console, że teraz ten kod który
    w niej wpisujesz ma się uruchomić w wybranym środowisku.

---

### Talk #5: <mark>PWA</mark>: Zrób to sam (live coding)

> Przerobienie przykładowej aplikacji na PWA: https://XXX

* Co trzeba zrobić, aby aplikacja została PWA?
    - przejść przez wszystkie zadania zdefiniowane w checkliście

* Jak sprawdzić, czy moja strona jest PWA?
    - uruchomić narzędzie "lighthouse" (jako plugin albo polecenie w terminalu)
    - albo uruchomić zakładkę "Audits" w Chrome DevTools

* Przykłady aplikacji
    - wykorzystać serwis https://pwa.rocks/
    - jak przerobić swoją stronę to zgłoś ją tutaj: https://github.com/pwarocks/pwa.rocks
    - moja ulubiona strona? https://m.aliexpress.com/
        - ktoś zna?
        - wiecie ile więcej konwersji? 2x więcej osób się rejestruje

1. ✅ HTTPS
2. ✅ RWD
3. Manifest
4. Service Worker
    - Cache resources
    - Display newest version

* Pokazać zestawienie jakie generatory projektów posiadają wbudowane 
    narzędzia do budowy aplikacji PWA
    - TODO: display how many libs are pwa by default
    - vue-cli
    - react-cli - `create-react-app` (pwa by default)
    - preact-cli ?
    - angular-cli (pwa by default)

* Narzędzia:
    - offline-plugin
    - sw-toolbox
    - sw-precache

* Boilerplate
    - Source: https://github.com/GoogleChrome/application-shell
    - Source: https://github.com/polymerelements/polymer-starter-kit
    - Source: https://github.com/google/web-starter-kit

* 💥Chcesz sobie zbudować aplikację na podstawie strony PWA?
    - wykorzystaj narzędzie: https://github.com/vladikoff/PWAify
    - zakończenie prelekcji:

        ```
        $ pwaify --platforms=darwin https://airhorner.com
        $ pwaify --platforms=darwin https://piecioshka.pl/blog/
        ```
