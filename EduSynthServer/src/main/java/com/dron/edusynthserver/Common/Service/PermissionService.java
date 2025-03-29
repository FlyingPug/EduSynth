package com.dron.edusynthserver.Common.Service;

import com.dron.edusynthserver.Common.Model.OwnedEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class PermissionService {
    public boolean isOwner(Long entityId,
                           Function<Long, ? extends OwnedEntity> entityProvider,
                           Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }

        OwnedEntity entity = entityProvider.apply(entityId);
        return entity != null && entity.getOwnerUsername().equals(authentication.getName());
    }

    public boolean isOwnerOrAdmin(Long entityId,
                                  Function<Long, ? extends OwnedEntity> entityProvider,
                                  Authentication authentication) {
        if (hasAdminRole(authentication)) {
            return true;
        }
        return isOwner(entityId, entityProvider, authentication);
    }

    private boolean hasAdminRole(Authentication auth) {
        return auth.getAuthorities().stream()
                .anyMatch(g -> g.getAuthority().equals("ROLE_ADMIN"));
    }
}