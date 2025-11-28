package com.sofa.gallery.layout.service;

import com.sofa.gallery.layout.entity.LayoutConfig;
import com.sofa.gallery.layout.repository.LayoutRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LayoutService {
    private final LayoutRepository layoutRepository;

    public LayoutService(LayoutRepository layoutRepository) {
        this.layoutRepository = layoutRepository;
    }

    public LayoutConfig currentLayout() {
        return layoutRepository.get().orElseGet(() -> layoutRepository.save(new LayoutConfig(
                "沉浸式舒适体验",
                "精选布艺与皮艺系列，满足客厅每一寸的格调与舒适",
                List.of())));
    }

    public LayoutConfig updateLayout(LayoutConfig config) {
        return layoutRepository.save(config);
    }
}
