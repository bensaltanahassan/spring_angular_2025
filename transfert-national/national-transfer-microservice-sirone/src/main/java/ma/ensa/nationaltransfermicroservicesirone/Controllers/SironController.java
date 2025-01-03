package ma.ensa.nationaltransfermicroservicesirone.Controllers;

import ma.ensa.nationaltransfermicroservicesirone.Entities.BlacklistedClient;
import ma.ensa.nationaltransfermicroservicesirone.Services.SironService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/siron")
@RestController
public class SironController {

    private final SironService sironService;

    public SironController(SironService sironService) {
        this.sironService = sironService;
    }

    @GetMapping("hello-world")
    public String hello() {
        return "Hello World";
    }

    @GetMapping("is-blacklisted/{id}")
    public boolean isBlacklisted(@PathVariable String id) {

        return this.sironService.checkBlacklist(id);
    }

    @PostMapping("add-to-blacklist")
    public void addToBlacklisted(@RequestBody BlacklistedClient blacklistedClient) {
        this.sironService.addBlacklistedClient(blacklistedClient);
    }

    @PostMapping("remove-from-blacklist")
    public void removeFromBlacklisted(@RequestBody BlacklistedClient blacklistedClient) {
        this.sironService.removeBlacklistedCLient(blacklistedClient);
    }
}
